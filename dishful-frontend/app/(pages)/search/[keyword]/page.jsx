// app/searched-recipe/[keyword]/page.js
import SearchedRecipeClient from "@/components/SearchedRecipeClient";

export default function SearchedRecipePage({ params }) {
  const { keyword } = params;
  return <SearchedRecipeClient keyword={keyword} />;
}
