"use client"

import { Button } from '../ui/button'

function Forms() {
    return (
        <div>
            <form className='py-4 mx-auto max-w-7xl bg-white shadow-md p-8'>
                <div className='space-y-8'>
                    <div>
                        <input
                            type="number"
                            min={0}
                            placeholder="Enter your ID Number"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>
                </div>
                <Button className='mt-4' type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Forms