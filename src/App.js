import React, {useState} from 'react';
function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const addTask = () => {
    if(task!==''){
      const date = new Date();
      const formattedDate = date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      setTasks([...tasks, {id:Date.now(), text:task, complete:false, createDate:formattedDate}]);
      setTask('');
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task=>task.id!==id));
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task=>(task.id===id? {...task, complete:!task.complete}:task)));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const keyword = e.target.value.toLowerCase();
    const results = tasks.filter(task=>task.text.toLowerCase().includes(keyword));
    setSearchResult(results);
  }
  return (
    <>
      <div className='flex justify-start items-center flex-col gap-1 md:w-2/4 w-3/4 h-screen mx-auto text-center bg-zinc-100'>
        <h1 className='text-2xl font-bold mt-10 mb-1'>To-Do List</h1>
        <div className='flex justify-center flex-row gap-2'>
          <input className='border-2 border-black p-1 rounded w-2/3' type='text' placeholder='搜尋代辦事項' value={search} onChange={handleSearch}></input>
          <button className='bg-red-500 text-white p-1 rounded' onClick={()=>{setSearch(''); setSearchResult([]);}}>清除</button>
        </div>
        <div className='flex justify-center flex-row gap-2'>
          <input className='border-2 border-black p-1 rounded w-2/3' type='text' value={task} placeholder='請輸入新的代辦事項' onChange={(e)=>{setTask(e.target.value)}}></input>
          <button className='bg-blue-500 text-white p-1 rounded' onClick={addTask}>新增</button>
        </div>
        <ul className='sm:w-3/5 w-full h-full flex flex-col items-center overflow-y-auto my-2 px-2 border-y-2 border-gray-400'>
          <span>共{(search.length>0? searchResult.length : tasks.length)}筆</span>
          {tasks.length===0 && (<h1 className='font-bold text-xl'>目前沒有任何代辦事項!</h1>)}
          {(search.length>0? searchResult : tasks).map((task)=>(
            <li key={task.id} className='flex justify-between items-center gap-1 my-2 py-1 sm:w-full w-10/12 border-b-2'>
              <button className={'rounded p-1 me-1 '+ (task.complete? 'bg-yellow-500':'bg-blue-500 text-white')} onClick={()=>toggleComplete(task.id)}>{task.complete? (<i className="bi bi-check-circle-fill"></i>):(<i className="bi bi-circle"></i>)}</button>
              <div className='flex w-4/6 relative'>
                <span className={'text-start min-w-full break-words mb-3 '+(task.complete?'line-through text-gray-500' : '')}>{task.text}</span>
                <span className='text-xs absolute bottom-0'>{task.createDate}</span>
              </div>
              <button className='bg-red-500 p-1 text-white rounded' onClick={()=>deleteTask(task.id)}><i className="bi bi-trash"></i></button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
