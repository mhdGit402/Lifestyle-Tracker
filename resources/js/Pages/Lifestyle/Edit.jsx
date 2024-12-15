import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function EditLifestyle({ auth, lifestyle }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            title: lifestyle.title,
            start_date: lifestyle.start_date,
            end_date: lifestyle.end_date,
            user_id: auth.user.id,
        });

    function handleUpdate(e) {
        e.preventDefault();
        put(`/lifestyle/${lifestyle.id}`, {
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Update lifestyle
                </h2>
            }
        >
            <Head title="Update lifestyle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Update lifestyle
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Update lifestyle {data.title}
                                    </p>
                                </header>
                                <form
                                    onSubmit={handleUpdate}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
                                        />
                                        <TextInput
                                            id="title"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="title"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.title}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="start_date"
                                            value="Start date"
                                        />
                                        <TextInput
                                            id="start_date"
                                            className="mt-1 block w-full"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="start_date"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.start_date}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="end_date"
                                            value="End date"
                                        />
                                        <TextInput
                                            id="end_date"
                                            className="mt-1 block w-full"
                                            value={data.end_date}
                                            onChange={(e) =>
                                                setData(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="end_date"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.end_date}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Update
                                        </PrimaryButton>
                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                Lifestyle updated.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
