import { h } from 'preact';
import APIMonitorEditor from '../../components/APIMonitorEditor/index.js';

const CreateAPIMonitor = () => {
    return <APIMonitorEditor
    headerMessage="Create new API Monitor"
    buttonMessage="Create API Monitor"
    mode="CREATE"
    id={null}
    />
}


export default CreateAPIMonitor;