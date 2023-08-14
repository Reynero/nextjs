import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
    return(
        <>  
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.title}/>
            </Head>
            <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            descrip={props.meetupData.descrip}
            />
            
        </>
    );
}

export async function getStaticPaths(){
    const client = await MongoClient.connect("mongodb+srv://reynero96:chubaca320@cluster0.doojxmi.mongodb.net/");
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

    client.close();

    //this means that you can go to localhost/new-meetup/m1 and localhost/new-meetup/m2
    //because you only have until meetupId: "m2"
    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
        
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://reynero96:chubaca320@cluster0.doojxmi.mongodb.net/");
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)});

    client.close();
    //fetch data for a single meetup
    return{
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                descrip: selectedMeetup.description
            }
        }
    }
}
export default MeetupDetails;