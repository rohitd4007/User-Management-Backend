const User = require("../Models/userModel")
const lodash = require('lodash')

const { isEmpty } = lodash
// console.log('came here------------------')

const getFilteredUser = (users, appliedFilter) => {
    return users?.filter((user) => {
        let isFilter = true
        Object.keys(appliedFilter)?.map((key) => {
            // console.log(user[key])
            isFilter = user[key]?.toLowerCase() == appliedFilter[key]?.toLowerCase()
        })
        return isFilter
    })
}


const validateData = (email, number) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var numberRegex = /^\D*(\d\D*){10}$/
    return emailRegex.test(email) && numberRegex.test(number)
}

exports.getAllUser = async (req, res, next) => {
    let filters = req.query
    let filteredUsers
    // console.log(filters)
    try {
        const user = await User.find();

        if (!isEmpty(filters)) {
            filteredUsers = getFilteredUser(user, filters)
            if (isEmpty(filteredUsers)) throw new Error("No User Found With Given Filter")
        }
        // else
        //     filteredUsers = user
        res.status(201).json({
            status: 'sucess',
            data: !isEmpty(filters) ? filteredUsers : user,
        });
    } catch (err) {
        console.log('check err', err)
        next(err)

    }
}


exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (isEmpty(user))
            throw new Error('User Not Found with given id');
        else res.status(201).json({
            status: 'sucess',
            data: { user },
        })
    } catch (err) {
        // console.log(err, err.status)
        next(err)
    }
}

exports.createUser = async (req, res, next) => {
    // console.log('came here', req.body)
    let phonenumber = req?.body?.phonenumber
    let email = req?.body?.email
    let valid = validateData(email, phonenumber)
    try {
        const user = await User.create(req.body);
        if (!valid) throw new Error('Email or Phone Number is Invalid');
        else res.status(201).json({
            status: 'sucess',
            data: { user },
        });
    } catch (err) {
        next(err)
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const new_User = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            data: new_User,
            status: 'sucess'
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err)
    }
};