import {Button} from "@/components/ui/button";

function UserDetailsForm({ loading }: { loading: boolean }) {
    return (
        <main className="max-w-2xl">
            <form className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="idNumber" className="block text-sm font-medium">
                        National ID
                    </label>
                    <input
                        type="number"
                        placeholder="Enter your ID Number"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium">
                        Phone number
                    </label>
                    <input
                        type="number"
                        placeholder="Enter your Phone Number"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>
                <hr />
                <div className="flex items-end justify-end">
                    <Button className="mt-0 bg-blue-400 text-white" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </main>
    );
}

export default UserDetailsForm;