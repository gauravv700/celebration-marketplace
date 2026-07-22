const Input = ({

    label,

    error,

    ...props

}) => {

    return (

        <div className="space-y-1">

            <label className="font-medium">

                {label}

            </label>

            <input

                {...props}

                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-600"

            />

            {

                error &&

                <p className="text-sm text-red-500">

                    {error.message}

                </p>

            }

        </div>

    );

};

export default Input;