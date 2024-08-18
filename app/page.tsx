import {auth} from "@/auth";

export default async function Home() {
    const session = await auth()
  return (
      <>
        <div className="container">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to next Dashboard
                </h1>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Your details</h2>
                <p className="text-center">{JSON.stringify(session)}</p>
            </div>
        </div>
      </>
  );
}
