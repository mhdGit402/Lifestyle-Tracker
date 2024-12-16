import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { LuDelete } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";

export default function CreateLifestyle({ auth }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        title: "",
        start_date: "",
        end_date: "",
        user_id: auth.user.id,
        items: [{ title: "" }], // Dynamic fields for Table 2 (Items)
    });

    // Handle changes for static fields
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Handle changes for dynamic fields
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...data.items];
        updatedItems[index][field] = value;
        setData("items", updatedItems);
    };

    // Add a new dynamic field
    const addItem = () => {
        setData("items", [...data.items, { title: "" }]);
    };

    // Remove a dynamic field
    const removeItem = (index) => {
        const updatedItems = data.items.filter((_, i) => i !== index);
        setData("items", updatedItems);
    };

    function handleCreate(e) {
        e.preventDefault();
        post("/lifestyle", {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create lifestyle
                </h2>
            }
        >
            <Head title="Create lifestyle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Create lifestyle
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Add new lifestyle
                                    </p>
                                </header>
                                <form
                                    onSubmit={handleCreate}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
                                        />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
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
                                            name="start_date"
                                            className="mt-1 block w-full"
                                            value={data.start_date}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
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
                                            name="end_date"
                                            className="mt-1 block w-full"
                                            value={data.end_date}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            required
                                            isFocused
                                            autoComplete="end_date"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.end_date}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <InputLabel
                                                htmlFor="item1"
                                                className="mr-2" // Add margin to the right for spacing
                                            >
                                                Items
                                            </InputLabel>
                                            <button
                                                type="button"
                                                onClick={addItem}
                                                className="flex items-center justify-center"
                                            >
                                                <CiSquarePlus className="text-blue-500 w-8 h-8 hover:text-blue-700 transition duration-200" />
                                            </button>
                                        </div>
                                        <InputError
                                            className="mt-2"
                                            message={errors.items}
                                        />
                                        {data.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-2"
                                            >
                                                <TextInput
                                                    id={`item${index}`}
                                                    className="mt-1 block w-full"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    className="flex items-center justify-center"
                                                >
                                                    <LuDelete className="text-red-500 w-8 h-8 hover:text-red-700 transition duration-200" />
                                                </button>
                                                {errors[
                                                    `items.${index}.title`
                                                ] && (
                                                    <InputError
                                                        className="mt-2"
                                                        message={
                                                            errors[
                                                                `items.${index}.title`
                                                            ]
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                Lifestyle saved.
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
