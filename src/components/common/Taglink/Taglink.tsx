import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import API from '../../../config/api.config'

import {queryData} from '../../../store/actions/taglinkAction'
import {groupBy} from 'lodash'
import './Taglink.scss'


interface Props extends RouteComponentProps {
    props: any,
    queryData: any,
    tagList: []
}

interface State {

}

class taglinkList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount(): void {
        this.props.queryData()
    }

    render() {
        const list = this.props.tagList;
        const groupObj = groupBy(list, 'category.name');
        let dataList: any = [];
        Object.keys(groupObj).forEach(key => {
            dataList.push({tag: key, list: groupObj[key]});
        })

        return (
            <div>
                <ListItem list={dataList}></ListItem>
            </div>
        )
    }
}

function ListItem(props: any) {
    const tagList = props.list;
    const color = [
        {color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)'},
        {color: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)'},
        {color: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)'},
        {color: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)'},
        {color: 'linear-gradient(to top, #f77062 0%, #fe5196 100%)'},
        {color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
    ]
    const list = tagList.map((item: any, index: any) =>
        <div key={item.tag} className="tagList">
            <div className="tagName">
                <i style={{backgroundImage: `${color[index%color.length].color}`}}></i>
                {item.tag}
            </div>
            <Tags tag={item.list}></Tags>
        </div>
    )

    return (
        <div>{list}</div>
    )
}

function Tags(props: any) {
    const tags = props.tag;
    const tag = tags.map((item: any) =>
        <li key={item.id}>
            {item.icon ? (
                <Avatar src={`${API.preview}/${JSON.parse(item.icon)[0].value}`} style={{margin: '5px auto', borderRadius: '5px'}}></Avatar>
            ) : (
                <Avatar style={{
                    margin: '5px auto',
                    borderRadius: '5px',
                    backgroundColor: '#56a9ff'
                }}>{item.name.substring(0, 1).toUpperCase()}</Avatar>
            )}

            <p>{item.name}</p>
        </li>
    )

    return (
        <ul className="tagItem">{tag}</ul>
    )
}


const mapStateToProps = (state: { tagLink: any }) => {
    return state.tagLink
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        queryData: () => {
            dispatch(queryData())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(taglinkList))



