
const CategoryMenu = ({category_list, categories, handleSelectAllChange, handleCheckboxChange}) =>{
    return (
          <List
            id="basic-menu"
          >
            <FormControlLabel className='pl-2' control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
            <FormGroup className='pl-5'>
                  {category_list.map(category=>(
                      <FormControlLabel key={category.id} control={<Checkbox checked={categories.includes(category.id)} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                  ))}
            </FormGroup>
          </List>
    )
}

export default CategoryMenu;