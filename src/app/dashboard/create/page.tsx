"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postHandler } from "@/app/action";
import { SubmitButton } from "../../../components/general/submitButton";
import { useState } from "react";

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

export default function CreateBlog() {
    const [urlError, setUrlError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const imageURL = formData.get("imageURL") as string;
        
        if (!isValidUrl(imageURL)) {
            setUrlError("Please enter a valid image URL");
            return;
        }

        setUrlError(null);
        await postHandler(formData);
    };

    return (
        <div>
            <Card className="border-3 border-white bg-black max-w-3xl mx-auto mt-7">
                <CardHeader>
                    <CardTitle className="text-white">Create Post</CardTitle>
                    <CardDescription className="text-white">Your post will be reviewed before being published</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit}>
                        <div>
                            <Input 
                                name="title"
                                required 
                                className="mb-4 border-2 border-white text-white" 
                                type="text" 
                                placeholder="Title"
                            />
                        </div>
                        <div>
                            <Textarea 
                                name="content"
                                required 
                                className="mb-4 border-2 border-white text-white" 
                                placeholder="Content"
                            />
                        </div>
                        <div>
                            <Input 
                                name="imageURL"
                                required 
                                className={`mb-1 border-2 ${urlError ? 'border-red-500' : 'border-white'} text-white`}
                                type="text" 
                                placeholder="Image URL"
                                onChange={() => setUrlError(null)}
                            />
                            {urlError && (
                                <p className="text-red-500 text-sm mb-3">{urlError}</p>
                            )}
                        </div>
                        <div>
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}