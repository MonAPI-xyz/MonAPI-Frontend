import { h } from 'preact';
import APIMonitorEditor from '../../components/APIMonitorEditor/index.js';

const EditAPIMonitor = ({passed_id}) => {
    return <APIMonitorEditor
    headerMessage="Edit Your API Monitor"
    buttonMessage="Save Edit"
    mode="EDIT"
    id={passed_id}
    />
}

export default EditAPIMonitor;