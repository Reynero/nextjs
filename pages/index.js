import {MongoClient} from 'mongodb';
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList"

function HomePage(props){
    
    return(

        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta name='description' content='Browse a huge list of active React meetups'></meta>
            </Head>
            <MeetupList meetups={props.meetups}/>//you are using it here for example
        </>
    );
}

/*export async function getServerSideProps(context){
    //fetch data from an API
    const req = context.req;
    const res = context.res;
    return {
        props:{
            meetups: DUMMY
        }
    }
}*/


//this function will always run on production phase, nextjs will serach for this function, run it, and then wil render the page
export async function getStaticProps(){
    //fetch data from an API
    const client = await MongoClient.connect("mongodb+srv://reynero96:chubaca320@cluster0.doojxmi.mongodb.net/");
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const meetups =  await meetupCollection.find().toArray();

    client.close();

    return {
        props:{
            meetups:meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image:  meetup.image,
                id: meetup._id.toString()
            }))
            //here we are creating static props, so you can use them here'
        },
        revalidate: 1 //this means that every SECOND this webpage will be updated in case there is new data 
    };//you always need to return an object from this function
}

export default HomePage;