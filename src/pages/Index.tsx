
import { HouseVisualizer } from "@/components/visualizer/HouseVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">House Visualizer</h1>
        <HouseVisualizer />
      </div>
    </div>
  );
};

export default Index;
