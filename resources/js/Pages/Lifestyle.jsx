import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function Lifestyle({ auth, items }) {
    const { delete: destroy, recentlySuccessful } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        destroy(`/lifestyle/${id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Lifestyle
                </h2>
            }
        >
            <Head title="Lifestyle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-green-600 dark:text-green-400">
                                                    Lifestyle deleted.
                                                </p>
                                            </Transition>
                                            <table className="min-w-full">
                                                <caption className="py-2 text-start text-sm dark:text-white">
                                                    <Link
                                                        href={route(
                                                            "lifestyle.create"
                                                        )}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
                                                        >
                                                            Add Lifestyle
                                                        </button>
                                                    </Link>
                                                </caption>

                                                <thead>
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className=" px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                        >
                                                            Title
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                        >
                                                            Start date
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                        >
                                                            End date
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                    {items &&
                                                        items.map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                                    {item.title}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                    {
                                                                        item.start_date
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                    {
                                                                        item.end_date
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                    <Link
                                                                        href={route(
                                                                            "lifestyle.edit",
                                                                            {
                                                                                lifestyle:
                                                                                    item,
                                                                            }
                                                                        )}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                    |
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleDelete(
                                                                                e,
                                                                                item.id
                                                                            )
                                                                        }
                                                                        type="submit"
                                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
