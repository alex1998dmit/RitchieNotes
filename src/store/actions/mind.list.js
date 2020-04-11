import tree from '../../services/variables/test.tree';

const addNode = (id, node) => {
    
    return {
        type: 'ADD_NODE_TO_LIST_TREE',
        tree,
    }
}

const removeBlock = id => {
    return {
        type: 'REMOVE_HOR_MIND_TABLE_BLOCK',
        id,
    };
};

const updateBlock = (id, block) => {
    return {
        type: 'UPDATE_HOR_MIND_TABLE_BLOCK',
        id,
        block,
    };
};

const setUIStatusToBlock = (id, status) => {
    return {
        type: 'SET_STATUS_TO_HOR_MIND_TABLE_BLOCK',
        id,
        status,
    };
};

const resetUISelectedStatus = status => {
    return {
        type: 'RESET_STATUS_AT_HOR_MIND_TABLE',
        status,
    };
};

export default {
    fromTreeToTable,
    removeBlock,
    updateBlock,
    setUIStatusToBlock,
    resetUISelectedStatus,
};
