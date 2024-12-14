import Link from "next/link";
import { useRouter } from "next/navigation";

const RecipeOptionsModal = ({ isVisible, onClose }) => {
  const router = useRouter();
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">Generate Recipe</h2>
        <Link
          href={"/recipe-ai"}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg font-medium flex justify-center items-center"
          onClick={() => {
            onClose();
            // Logic to navigate to "Generate from Meal Name"
            console.log("Navigate to Generate from Meal Name");
          }}
        >
          Generate from Meal Name
        </Link>
        <Link
          href={"/random-recipe"}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg font-medium flex justify-center items-center"
          onClick={() => {
            onClose();
          }}
        >
          Generate Random Recipe
        </Link>
        <button
          className="w-full py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition text-lg font-medium"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RecipeOptionsModal;
