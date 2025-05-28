import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button 
            className="border-3 border-white hover:bg-white hover:text-black" 
            type="submit" 
            disabled={pending}
        >
            {pending ? "Submitting..." : "Create Post"}
        </Button>
    );
}
