import {
    useLocation
  } from "react-router-dom";

const usePathId = () => {
    const location = useLocation();
    const pathId = parseInt(location.pathname.replace("/", ""));

    return pathId;
};

export default usePathId;
