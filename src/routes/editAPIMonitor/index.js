import { h } from 'preact';
import APIMonitorEditor from '../../components/APIMonitorEditor/index.js';

const EditAPIMonitor = ({id}) => {
    return <APIMonitorEditor
    headerMessage="Edit Your API Monitor"
    buttonMessage="Save Edit"
    mode="EDIT"
    id={id}
    />
}

export default EditAPIMonitor;