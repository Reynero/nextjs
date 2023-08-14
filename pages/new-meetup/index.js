import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { route } from "next/dist/next-server/server/router";

//our-domain.com/new-meetup

const NewMeetupPage = () => {
    const router = useRouter();
    async function addMeetupHandler(enteredData){
        const response = await fetch("/api/new-meetup", {
            method:"POST",
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        console.log(data);
        router.push("/");
    }
    return(<>
        <Head>
                <title>React MeetUps</title>
                <meta name='description' content='Browse a huge list of active React meetups'></meta>
            </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>

    </>);
}

export default NewMeetupPage;