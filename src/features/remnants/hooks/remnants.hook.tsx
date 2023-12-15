import { useForm } from "react-hook-form";

export default function useRemnants() {

    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<any>({});

    return {
        control,
        errors,
        register,
    }
}
