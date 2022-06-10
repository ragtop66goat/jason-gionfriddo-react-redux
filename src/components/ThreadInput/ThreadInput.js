import {useSelector, useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {ON_SUBMIT_THREAD, ON_SET_ID, ON_SET_THREAD_CONTENT, ON_SET_THREAD_TITLE} from "../../modules/threads";

export function ThreadInput(props) {

  let {
    _useSelector = useSelector,
    _useDispatch = useDispatch,
    _uuidv4 = uuidv4
  } = props

  const threadTitle = _useSelector((state) => state.threadTitle)
  const threadContent = _useSelector((state) => state.threadContent)
  const threadId = _useSelector((state)=> state.id)
  const dispatch = _useDispatch()

  function onTitleChange(e) {
    dispatch({type: ON_SET_THREAD_TITLE, value: e.target.value})
  }

  function onContentChange(e) {
  dispatch({type: ON_SET_THREAD_CONTENT, value: e.target.value})
  }

  function submitThread() {
    let id;
    if(!threadId){
      id = _uuidv4();
    } else{
      id = threadId
    }
    dispatch({type: ON_SET_ID, value: id})
    const date = new Date().toISOString().substring(0, 10)
    dispatch({type: ON_SUBMIT_THREAD, value: { id, date}})
  }
return <>
  <div>
    <h1>Threadboard</h1>
  </div>
  <div className={"d-flex flex-column shadow p-3 mb-5 bg-white rounded p-2"}>
    <p>Post Thread?</p>
    <input onChange={onTitleChange} value={threadTitle} type={'text'} placeholder={'Title'}/>
    <input onChange={onContentChange} value={threadContent} className={'mt-3'} type={'text'} placeholder={'content'}/>
    <button className={"btn-sm btn-success w-25 mt-2"} onClick={submitThread}>Submit</button>
  </div>

</>
}