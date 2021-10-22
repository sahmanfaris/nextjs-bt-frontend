import Layout from "@/components/Layout";
import { NEXT_URL } from "@/config/index";

const EventPage = ({ event }) => {
  return (
    <Layout>
      <h1>{event.name}</h1>
    </Layout>
  );
};

export default EventPage;

//if we want a request to be made in build time we use combination of get static paths and get static props

export async function getStaticPaths() {
  const res = await fetch(`${NEXT_URL}/api/events`);
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
  const response = await fetch(`${NEXT_URL}/api/events/${slug}`);
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
