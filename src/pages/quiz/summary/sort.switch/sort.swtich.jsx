import { useState } from "react";
import { svgMap } from "../../../../config/constraints";
import "./sort.switch.css";
export default function SortSwtich({sortList, sortByHandler}) {
    const [nowSort, setNowSort] = useState(sortList[0])

    const nextSort = () => {
        const index = sortList.indexOf(nowSort)
        const sortBy = index === sortList.length - 1 ? sortList[0] : sortList[index + 1]
        setNowSort(sortBy)
        sortByHandler(sortBy)
    }

	return (
		<div className="sort__switch" onClick={ (e)=> {
            e.preventDefault()
            nextSort()
        } }>
			<div className="sort__type">{nowSort}</div>
			<div className="sort__svg">{svgMap.sortArrow}</div>
		</div>
	);
}
