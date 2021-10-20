import { useRouter } from 'next/dist/client/router'
import Layout from '@/components/Layout'

const EventPage = () => {
  const router = useRouter()
  return (
    <Layout>
      <h1>My Event</h1>
    </Layout>
  )
}

export default EventPage
