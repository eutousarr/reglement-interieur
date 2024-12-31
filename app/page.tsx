import { getData } from "@/src/actions/todoAction";
import Todos from "@/src/components/todos";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
