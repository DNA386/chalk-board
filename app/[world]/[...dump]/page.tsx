import { notFound } from "next/navigation";


export default function NoPage() {
  // If we got here we have gone wrong...
  notFound()
}
