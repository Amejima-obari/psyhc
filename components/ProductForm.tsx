"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const requestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters.")
    .max(500, "Message must not exceed 500 characters."),
});

type RequestFormValues = z.infer<typeof requestSchema>;

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black";

export default function ProductForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: RequestFormValues) {
    // Demo only: no backend or email service is connected.
    console.log("Validated request:", values);

    setSubmitted(true);
    reset();
  }

  return (
    <section
      id="contact"
      className="border-t border-gray-200 py-12"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">
          Product enquiry
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Complete the form to demonstrate validated user input.
        </p>

        {submitted && (
          <div
            role="status"
            className="mt-5 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          >
            Form validated successfully. This is a demo submission;
            no request was sent to a server.
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
            >
              Full name
            </label>

            <input
              id="name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "name-error" : undefined
              }
              className={inputClass}
              placeholder="Your name"
            />

            {errors.name && (
              <p
                id="name-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              className={inputClass}
              placeholder="you@example.com"
            />

            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={4}
              {...register("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "message-error" : undefined
              }
              className={inputClass}
              placeholder="Tell us what you need..."
            />

            {errors.message && (
              <p
                id="message-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}