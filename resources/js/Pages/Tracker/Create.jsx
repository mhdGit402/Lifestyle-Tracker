import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { DatePicker } from "@/components/DatePicker";

export default function CreateTracker({ auth, lifestyle }) {
    // Initialize defaultItems as an object
    const defaultItems = lifestyle.items.reduce((acc, item) => {
        acc[item.id] = false; // Set initial checked state to false
        return acc;
    }, {});

    const { data, setData, post, processing, errors } = useForm({
        submitted_date: "",
        items: [defaultItems],
        lifestyle_id: lifestyle.id,
    });

    const handleDate = (e) => {
        const dateString = e.date;

        // Create a Date object from the date string
        const date = new Date(dateString);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");

        // Format the date as YYYY/MM/DD
        const formattedDate = `${year}/${month}/${day}`;

        setData(e.name, formattedDate);
    };

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        // Update the items object
        const updatedItems = {
            ...data.items[0], // Get the existing object
            [name]: checked, // Update the checked state for the corresponding item ID
        };

        // Update the form data, wrapping the updated object in an array
        setData("items", [updatedItems]);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        post("/tracker");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Add Tracker
                </h2>
            }
        >
            <Head title="Add tracker" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Add tracker
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Add tracker for {lifestyle.title}
                                    </p>
                                </header>
                                <form
                                    onSubmit={handleCreate}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="submitted_date"
                                            value="Submitted date"
                                        />
                                        <DatePicker
                                            id="submitted_date"
                                            name="submitted_date"
                                            value={data.submitted_date}
                                            onChange={handleDate}
                                            required
                                            isFocused
                                            autoComplete="submitted_date"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.submitted_date}
                                        />
                                    </div>

                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                {lifestyle.items &&
                                                    lifestyle.items.map(
                                                        (item) => (
                                                            <th
                                                                key={item.id}
                                                                scope="col"
                                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                                                            >
                                                                {item.title}
                                                            </th>
                                                        )
                                                    )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            <tr>
                                                {lifestyle.items &&
                                                    lifestyle.items.map(
                                                        (item) => (
                                                            <td
                                                                key={item.id}
                                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                                                            >
                                                                <div className="flex items-center mb-4">
                                                                    <input
                                                                        id={`checkbox${item.id}`}
                                                                        name={
                                                                            item.id
                                                                        }
                                                                        type="checkbox"
                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        checked={
                                                                            data
                                                                                .items[0][
                                                                                item
                                                                                    .id
                                                                            ] ||
                                                                            false
                                                                        } // Access the checked state
                                                                        onChange={
                                                                            handleCheckboxChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                        )
                                                    )}
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Submit
                                        </PrimaryButton>
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
