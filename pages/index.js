import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { NEXT_URL } from "@/config/index";

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(`${NEXT_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0, 3) },
    // make request again after 1 sec if data is changed
    revalidate: 1,
  };
}
