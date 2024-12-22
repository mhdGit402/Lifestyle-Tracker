import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head } from "@inertiajs/react";

export default function View({ _, user }) {
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    View profile
                </h2>
            }
        >
            <Head title="View profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Profile information */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Profile Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    View your account's profile information and
                                    email address.
                                </p>
                            </header>

                            <div className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={user.name}
                                        disabled
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        disabled
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={user.email}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Profile streaks */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Profile streaks
                                </h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    View your account's profile streaks
                                </p>
                            </header>

                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    {user.streaks &&
                                        user.streaks.map((streak) => (
                                            <>
                                                <img
                                                    className="w-24 h-16 rounded-3xl"
                                                    src={`/images/streaks/${streak.streak_time}.png`}
                                                />
                                                <div className="font-medium dark:text-white">
                                                    {streak.streak_time}
                                                </div>
                                            </>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
