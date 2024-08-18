import {Button} from "@/components/ui/button";
import {auth} from "@/auth";

export default async function Home() {
    const session = await auth()
  return (
      <>
    <Button> test me </Button>
        <div className="container">
            <h1 className="text-4xl font-bold text-center">
                Welcome to Dashboard
            </h1>
            <Button> container </Button>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Sign in</h2>
                <p className="text-center">You are {JSON.stringify(session)}</p>
            </div>
        </div>
      </>
  );
}
