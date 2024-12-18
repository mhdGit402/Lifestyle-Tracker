import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ViewLifestyle({ auth, lifestyle }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    View lifestyle
                </h2>
            }
        >
            <Head title="View lifestyle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        View lifestyle
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        View lifestyle {lifestyle.title}
                                    </p>
                                </header>
                                <table className="min-w-full">
                                    <caption className="py-2 text-start text-sm dark:text-white">
                                        <Link
                                            href={route("tracker.show", {
                                                tracker: lifestyle,
                                            })}
                                        >
                                            <button
                                                type="button"
                                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
                                            >
                                                Track
                                                <div className="flex items-center gap-4"></div>
                                            </button>
                                        </Link>
                                    </caption>

                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className=" px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                            >
                                                Date
                                            </th>
                                            {lifestyle.items &&
                                                lifestyle.items.map((item) => (
                                                    <th
                                                        key={item.id}
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                    >
                                                        {item.title}
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {lifestyle.trackers &&
                                            lifestyle.trackers.map((track) => (
                                                <tr key={track.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                        {track.submitted_date}
                                                    </td>
                                                    {JSON.parse(track.items) &&
                                                        JSON.parse(
                                                            track.items
                                                        ).map((trackItem) => (
                                                            <>
                                                                {Object.values(
                                                                    trackItem
                                                                ).map(
                                                                    (value) => (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                                            {value ? (
                                                                                <span>
                                                                                    Achived
                                                                                </span>
                                                                            ) : (
                                                                                <span>
                                                                                    Failed
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                    )
                                                                )}
                                                            </>
                                                        ))}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
