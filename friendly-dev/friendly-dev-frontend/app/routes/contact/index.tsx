import { Form } from 'react-router';
import type { Route } from './+types';

export async function action({ request }: Route.ActionArgs) {
  const formdata = await request.formData();
  const name = formdata.get('name') as string;
  const email = formdata.get('email') as string;
  const subject = formdata.get('subject') as string;
  const message = formdata.get('message') as string;

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required!';
  if (!email) errors.email = 'Email is required!';
  if (!subject) errors.subject = 'Subject is required!';
  if (!message) errors.message = 'Message is required!';

  if (Object.keys(errors).length) {
    return { errors };
  }

  const data = { name, email, subject, message };

  // make DB call to submit form
  return { message: 'Form submitted successfully.', data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <>
      <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>
          ✉️ Contant Me
        </h2>

        {actionData?.message ? (
          <p className='mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md'>
            {actionData.message}
          </p>
        ) : null}

        <Form method='post' className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-300'
            >
              Fullname
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full mt-1 px-4 py-2 border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            />
            {errors.name && (
              <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-300'
            >
              Email
            </label>
            <input
              type='text'
              id='email'
              name='email'
              className='w-full mt-1 px-4 py-2 border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            />
            {errors.email && (
              <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block text-sm font-medium text-gray-300'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              className='w-full mt-1 px-4 py-2 border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            />
            {errors.subject && (
              <p className='text-red-400 text-sm mt-1'>{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-300'
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              className='w-full mt-1 px-4 py-2 border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            />
            {errors.message && (
              <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
            )}
          </div>

          <button className='w-full bg-blue-600 text-white py-2 rounded-lg transition cursor-pointer hover:bg-blue-700'>
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default ContactPage;
