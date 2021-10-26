import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPage = ({ event }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <EventMap evt={event} />

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

//if we want a request to be made in build time we use combination of get static paths and get static props

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((e) => ({
    params: { slug: e.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await response.json();
  return {
    props: {
      event: events[0],
      revalidate: 1,
    },
  };
}

// else use this down

// export async function getServerSideProps({ query: { slug } }) {
//   const response = await fetch(`${NEXT_URL}/api/events/${slug}`);
//   const events = await response.json();
//   return {
//     props: {
//       event: events[0],
//     },
//   };
// }
