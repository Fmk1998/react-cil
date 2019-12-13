import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'

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
        {color: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'},
        {color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'},
        {color: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'},
        {color: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)'},
        {color: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)'},
        {color: 'linear-gradient(to top, #feada6 0%, #f5efef 100%)'}
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
                <Avatar src={`${JSON.parse(item.icon)[0].value}.png`} style={{margin: '0 auto', borderRadius: '5px'}}></Avatar>
            ) : (
                <Avatar style={{
                    margin: '0 auto',
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



