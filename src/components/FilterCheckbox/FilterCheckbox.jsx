import "./FilterCheckbox.css";

export default function FilterCheckbox() {
    return (
        <div className="filter-container">
            <label className="filter">
                <input className="filter__checkbox" type="checkbox" />
                <span className="filter__tumbler"></span>
            </label>
            <p className="filter__text">Короткометражки</p>
        </div >
    );
}