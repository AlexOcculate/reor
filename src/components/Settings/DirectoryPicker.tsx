// DirectoryPicker.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

interface DirectoryPickerProps {
  //   onDirectorySelect: (directory: string) => void;
  userHasCompleted: (completed: boolean) => void;
}

const DirectoryPicker: React.FC<DirectoryPickerProps> = ({
  userHasCompleted,
}) => {
  const [userDirectory, setUserDirectory] = useState<string>("");

  useEffect(() => {
    const userDirectory = window.electronStore.getUserDirectory();
    console.log("GOTTEN USER DIRECTORY: ", userDirectory);
    if (userDirectory) {
      setUserDirectory(userDirectory);
      userHasCompleted(true);
    }
  }, []);

  const handleDirectorySelection = async () => {
    const paths = await window.files.openDirectoryDialog();
    if (paths && paths.length > 0) {
      const path = paths[0];
      console.log("calling set directory IN DIRECTORY PICKER: ", path);
      window.electronStore.setUserDirectory(path);
      userHasCompleted(true);
      setUserDirectory(path);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-0 text-white">
        Welcome to the Reor Project.
      </h2>
      <p className="mt-2 text-gray-100">
        Reor is a self-organising note-taking app. Each note will be saved as a
        markdown file to a &quot;vault&quot; directory on your machine.
      </p>
      <p className="mt-2 text-gray-100">
        Please choose your vault directory here:
      </p>
      <Button
        className="bg-slate-700 border-none h-10 hover:bg-slate-900 cursor-pointer w-[140px] text-center pt-0 pb-0 pr-2 pl-2"
        onClick={handleDirectorySelection}
        placeholder=""
      >
        Select Directory
      </Button>
      <p className="mt-2 text-gray-100 text-xs">
        (You can choose something with files in it. Those files will be indexed)
      </p>
      {userDirectory && (
        <p className="mt-2 text-xs text-gray-100">
          Selected: <strong>{userDirectory}</strong>
        </p>
      )}
      {/* {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>} */}
    </>
  );
};

export default DirectoryPicker;
