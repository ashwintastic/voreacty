import React from 'react'
import {Link} from 'react-router-dom'
import {SERVICE_STATUS} from '../../config/constants'


const TableHeader = () => {
	return (<thead>
                <tr>
                    <th>Sr No</th>
                    <th>Service Provider</th>
                    <th>Service Title</th>
                    <th>Submitted on</th>
                    <th>Status</th>
                    <th>Last updated</th>
                    <th>Remarks</th>
                    <th>Action</th>
                </tr>
                </thead>);
}

const TableRow = (rowprops) => {
	let index = rowprops.index+1;
	let SPName = rowprops.servideObj.SPName;
	let title =rowprops.servideObj.title;
	let created_at =rowprops.servideObj.created_at;
	let status = rowprops.servideObj.displayStatus;
	let updated_at =rowprops.servideObj.updated_at;
	let serviceId = rowprops.servideObj.id;

	return (
		<tr>
	        <td>{index}</td>
	        <td>{SPName}</td>
	        <td><span
	                className="text-overflow-ellipsis inline-block max-width-230">{title}</span>
	        </td>
	        <td>{created_at}</td>
	        <td>{status}</td>
	        <td>{updated_at}</td>
	        <td><input type="text" className="custom-form-control" placeholder="Enter here" /></td>
	        <td>
		        <Link to={"/service/"+ serviceId + "/edit"} className="color-black-1 font-12 m-lr-5"><i className="fa fa-pencil"></i>
	              Edit
	            </Link>
	            { /*
	            <select className="custom-form-control">
	                <option>Evaluate</option>
	                <option>Move to preview</option>
	                <option>Activate</option>
	            </select>
	        	*/ }
	        </td>
	    </tr>
		)
}

const AdminDashboardTable = (props) => {
    console.log("AdminDashboardTable Props: ", props);
    console.log(typeof(props.services))
    window.history.pushState('', '', '/admin');
    return (
          <div className="table-responsive admin-ui-table">
                <table className="table table-striped ">
                    <TableHeader/>
                    <tbody>
                    {
                    	props.services.length > 0 ?(
                    	props.services.map(function(servideObj, index){
                    	return <TableRow key={servideObj.id} servideObj={servideObj} index={index}/>
                    	})
                    	)
                    	:(null)
                    }
                    </tbody>
                </table>
            </div>
        )
}
export default AdminDashboardTable;