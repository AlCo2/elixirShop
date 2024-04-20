import DashboardLayout from "../DashboardLayout";

const page = () => {
  return (
    <div>message</div>
  )
}
page.layout = page => <DashboardLayout children={page} tite="message" />
export default page;