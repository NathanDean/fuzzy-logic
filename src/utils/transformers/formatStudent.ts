// Transforms RawStudent object to Student object
import type { RawStudent, Student } from '@/types/Student';
import { z } from 'zod';

// Zod schema to validate RawStudent type object and transform to Student type object
const studentSchema = z
  .object({
    id: z.string().min(1, 'id is missing from raw student data.'),
    email: z
      .string()
      .email('email is missing from raw student data or invalid.'),
    user_metadata: z.object({
      first_name: z
        .string()
        .min(1, 'first_name is missing from raw student data.'),
      last_name: z
        .string()
        .min(1, 'last_name is missing from raw student data.'),
    }),
  })
  .transform((data) => ({
    id: data.id,
    first_name: data.user_metadata.first_name,
    last_name: data.user_metadata.last_name,
    email: data.email,
  }));

export default function (rawStudent: RawStudent): Student {
  // Transform input
  const result = studentSchema.safeParse(rawStudent);

  // Handle error
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  // Return formatted student
  const student = result.data;
  return student;
}
