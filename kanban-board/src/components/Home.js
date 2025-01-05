import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns || [];

  // Handle window resizing
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e4e9f2] dark:from-[#20212c] dark:to-[#2b2c37] overflow-hidden">
      {/* Sidebar */}
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex gap-6 overflow-x-auto p-6 ${
          windowSize[0] >= 768 && isSideBarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* Columns Section */}
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
            {/* New Column Button */}
            <div
              onClick={() => setIsBoardModalOpen(true)}
              className="min-w-[280px] h-auto flex justify-center items-center bg-[#e9effa] dark:bg-[#2b2c37] rounded-lg cursor-pointer text-[#828fa3] hover:text-[#71de99] transition duration-300 font-semibold text-xl"
            >
              + Add New Column
            </div>
          </>
        ) : (
          <EmptyBoard type="edit" />
        )}
      </div>

      {/* Modals */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
