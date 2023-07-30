import './FilterCheckbox.css';

export default function FilterCheckbox({ shortMovies, handleShortFilms }) {
    return (
        <div className="filter">
            <label className="filter-container">
                <input
                    className="filter__checkbox"
                    type="checkbox"
                    onChange={handleShortFilms}
                    checked={shortMovies ? true : false}
                />
                <span className="filter__tumbler"></span>
            </label>
            <p className="filter__text">Короткометражки</p>
        </div >
    )
}