import {useDispatch, useSelector} from "react-redux";
import Pagination from "../../../components/Pagination";
import {setCurrentPage} from "../actions/postList";


function PaginationComponent() {
    const dispatch = useDispatch();
    const { totalPages, currentPage } = useSelector(({ postList }) => postList);

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => dispatch(setCurrentPage(value))}
        />
    );
}

export default PaginationComponent ;