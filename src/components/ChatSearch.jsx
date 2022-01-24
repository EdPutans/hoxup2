import styled from 'styled-components'
/**
 * @param {UseMainReturn & ClassNameExt} props
 */
function SearchBar({ className, search, updateSearch }) {

  return (
    <div className={className}>
      <input
        autoComplete="off"
        type="search"
        name="messagesSearch"
        placeholder="Search chats"
        value={search}
        onChange={e => updateSearch(e.target.value)}
      />
    </div>
  )
}

export default styled(SearchBar)`
  background-color: var(--search-container-background);

  input {
    width: 90%;
    border: solid 1px transparent;
  }

  input:focus {
    border-color: var(--background-stripe);
  }
`
