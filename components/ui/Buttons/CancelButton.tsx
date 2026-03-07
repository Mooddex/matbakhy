
interface onCancel{
  onCancel : ()=> void 
}
export default function Cancel({onCancel}:onCancel) {
    return(
        <div className="flex gap-2">
  <button
    type="button"
    onClick={() => onCancel()}
    className="px-4 py-2 rounded border bg-blue-600 text-white hover:bg-blue-950 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 w-full">
    Cancel
  </button>
  
</div>
    )
}