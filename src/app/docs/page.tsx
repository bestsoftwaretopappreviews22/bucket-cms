import { Bucket } from "../bucket"
import Header from "../demo/components/ui/header"
import GithubLink from "../demo/components/ui/github-link"

export default async function Docs() {
  return (
    <main>
      <Header>
        <GithubLink />
      </Header>
      <div className="w-full border opacity-50"></div>
      <Bucket view="DEV" hideViewSwitch={true} />
    </main>
  )
}