import { h } from "preact";
import { screen, waitFor, render } from "@testing-library/preact";
import * as axios from "axios";
import EditAPIMonitor from "../../../src/routes/editAPIMonitor/index.js";
import userEvent from "@testing-library/user-event";
import { setUserToken } from "../../../src/config/api/auth.js";
import BASE_URL from '../../../src/config/api/constant.js';

jest.mock("axios");

describe("Edit is Integrated with Backend", () => {
    test("Set form initial value with value from backend", async () => {
        const get_detail = {
            id: 2,
            name: "NEWLY CREATED",
            method: "GET",
            url: "test/path/",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: {
                body: "TEST RAW BODY"
            },
            previous_step_id: null,
			status_page_category_id: null,
            success_rate: [],
            response_time: [],
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: []
        }
        const get_list = [
             {
                 id: 1,
                 name: "OLD CREATED",
                 method: "GET",
                 url: "oldtest/path",
                 schedule: "10MIN",
                 body_type: "EMPTY",
                 query_params: [],
                 headers: [],
                 body_form: [],
                 raw_body: null,
                 previous_step_id: null,
				 status_page_category_id: null,
                 assertion_type: "DISABLED",
                 assertion_value: "",
                 is_assert_json_schema_only: false,
                 exclude_keys: []
             }
         ]

        axios.get.mockImplementation((url) => {
            switch(url) {
                case `${BASE_URL}/monitor/2/`:
                    return Promise.resolve({data: get_detail})
                case `${BASE_URL}/monitor/2`:
                    return Promise.resolve({data: get_detail})
                case `${BASE_URL}/monitor/`:
                    return Promise.resolve({data: get_list})
				case `${BASE_URL}/status-page/category/`:
					return Promise.resolve({data: {
						"id": 2,
						"team": 14,
						"name": "abc"
					}, status: 201})					
            }
        });

        setUserToken("userToken");
        render(<EditAPIMonitor id="2" />);

        await waitFor(async () => {
            expect(screen.getByDisplayValue('NEWLY CREATED')).toBeDefined()
            expect(screen.getByText('OLD CREATED - oldtest/path')).toBeDefined()
        }, 5000)

    })

    test("Edit front end is integrated with backend", async () => {
        const get_detail = {
            id: 2,
            name: "NEWLY CREATED",
            method: "GET",
            url: "test/path/",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null,
            previous_step_id: null,
			status_page_category_id: null,
            success_rate: [],
            response_time: [],
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: []
        }
        const get_list = [
             {
                 id: 1,
                 name: "OLD CREATED",
                 method: "GET",
                 url: "oldtest/path",
                 schedule: "10MIN",
                 body_type: "EMPTY",
                 query_params: [],
                 headers: [],
                 body_form: [],
                 raw_body: null,
                 previous_step_id: null,
				 status_page_category_id: null,
                 assertion_type: "DISABLED",
                 assertion_value: "",
                 is_assert_json_schema_only: false,
                 exclude_keys: []
             }
         ]

		const response_stats = {
			success_rate: [
				{
					start_time: "2022-10-14T10:18:39.865038+07:00",
					end_time: "2022-10-14T11:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T11:18:39.865038+07:00",
					end_time: "2022-10-14T12:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T12:18:39.865038+07:00",
					end_time: "2022-10-14T13:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T13:18:39.865038+07:00",
					end_time: "2022-10-14T14:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T14:18:39.865038+07:00",
					end_time: "2022-10-14T15:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T15:18:39.865038+07:00",
					end_time: "2022-10-14T16:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T16:18:39.865038+07:00",
					end_time: "2022-10-14T17:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T17:18:39.865038+07:00",
					end_time: "2022-10-14T18:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T18:18:39.865038+07:00",
					end_time: "2022-10-14T19:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T19:18:39.865038+07:00",
					end_time: "2022-10-14T20:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T20:18:39.865038+07:00",
					end_time: "2022-10-14T21:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T21:18:39.865038+07:00",
					end_time: "2022-10-14T22:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T22:18:39.865038+07:00",
					end_time: "2022-10-14T23:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T23:18:39.865038+07:00",
					end_time: "2022-10-15T00:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T00:18:39.865038+07:00",
					end_time: "2022-10-15T01:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T01:18:39.865038+07:00",
					end_time: "2022-10-15T02:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T02:18:39.865038+07:00",
					end_time: "2022-10-15T03:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T03:18:39.865038+07:00",
					end_time: "2022-10-15T04:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T04:18:39.865038+07:00",
					end_time: "2022-10-15T05:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T05:18:39.865038+07:00",
					end_time: "2022-10-15T06:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T06:18:39.865038+07:00",
					end_time: "2022-10-15T07:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T07:18:39.865038+07:00",
					end_time: "2022-10-15T08:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T08:18:39.865038+07:00",
					end_time: "2022-10-15T09:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T09:18:39.865038+07:00",
					end_time: "2022-10-15T10:18:39.865038+07:00",
					success: 0,
					failed: 0
				}
			],
			response_time: [
				{
					start_time: "2022-10-14T10:18:39.865038+07:00",
					end_time: "2022-10-14T11:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T11:18:39.865038+07:00",
					end_time: "2022-10-14T12:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T12:18:39.865038+07:00",
					end_time: "2022-10-14T13:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T13:18:39.865038+07:00",
					end_time: "2022-10-14T14:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T14:18:39.865038+07:00",
					end_time: "2022-10-14T15:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T15:18:39.865038+07:00",
					end_time: "2022-10-14T16:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T16:18:39.865038+07:00",
					end_time: "2022-10-14T17:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T17:18:39.865038+07:00",
					end_time: "2022-10-14T18:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T18:18:39.865038+07:00",
					end_time: "2022-10-14T19:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T19:18:39.865038+07:00",
					end_time: "2022-10-14T20:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T20:18:39.865038+07:00",
					end_time: "2022-10-14T21:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T21:18:39.865038+07:00",
					end_time: "2022-10-14T22:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T22:18:39.865038+07:00",
					end_time: "2022-10-14T23:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T23:18:39.865038+07:00",
					end_time: "2022-10-15T00:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T00:18:39.865038+07:00",
					end_time: "2022-10-15T01:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T01:18:39.865038+07:00",
					end_time: "2022-10-15T02:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T02:18:39.865038+07:00",
					end_time: "2022-10-15T03:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T03:18:39.865038+07:00",
					end_time: "2022-10-15T04:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T04:18:39.865038+07:00",
					end_time: "2022-10-15T05:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T05:18:39.865038+07:00",
					end_time: "2022-10-15T06:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T06:18:39.865038+07:00",
					end_time: "2022-10-15T07:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T07:18:39.865038+07:00",
					end_time: "2022-10-15T08:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T08:18:39.865038+07:00",
					end_time: "2022-10-15T09:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T09:18:39.865038+07:00",
					end_time: "2022-10-15T10:18:39.865038+07:00",
					avg: 0
				}
			]
		}

        axios.get.mockImplementation((url) => {
            switch(url){
                case `${BASE_URL}/monitor/stats/`:
                    return Promise.resolve({data: response_stats})
                case `${BASE_URL}/monitor/2`:
                    return Promise.resolve({data: get_detail})
                case `${BASE_URL}/monitor/`:
                    return Promise.resolve({data: get_list})
				case `${BASE_URL}/status-page/category/`:
					return Promise.resolve({data: {
						"id": 2,
						"team": 14,
						"name": "abc"
					}, status: 201})	
            }
        })

        setUserToken("User Token");
        const mockFn = jest.fn();
        const response = []

        axios.put.mockImplementation(() => {
             mockFn();
             return Promise.resolve({status: 200, data: response})
        })


        render(<EditAPIMonitor id = {2} />);
        await waitFor(async () => {
            expect(screen.getByText('Edit Your API Monitor')).toBeDefined();
        })
        userEvent.click(screen.getByText('Save Edit'));

        await waitFor(async () => {
            expect(mockFn).toBeCalledTimes(1);
        }, 5000)

    })

test("Edit front end is integrated with backend negative", async () => {
        const get_detail = {
            id: 2,
            name: "NEWLY CREATED",
            method: "GET",
            url: "test/path/",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null,
            previous_step_id: null,
			status_page_category_id: null,
            success_rate: [],
            response_time: [],
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: []
        }
        const get_list = [
             {
                 id: 1,
                 name: "OLD CREATED",
                 method: "GET",
                 url: "oldtest/path",
                 schedule: "10MIN",
                 body_type: "EMPTY",
                 query_params: [],
                 headers: [],
                 body_form: [],
                 raw_body: null,
                 previous_step_id: null,
				 status_page_category_id: null,
                 assertion_type: "DISABLED",
                 assertion_value: "",
                 is_assert_json_schema_only: false,
                 exclude_keys: []
             }
         ]

		const response_stats = {
			success_rate: [
				{
					start_time: "2022-10-14T10:18:39.865038+07:00",
					end_time: "2022-10-14T11:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T11:18:39.865038+07:00",
					end_time: "2022-10-14T12:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T12:18:39.865038+07:00",
					end_time: "2022-10-14T13:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T13:18:39.865038+07:00",
					end_time: "2022-10-14T14:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T14:18:39.865038+07:00",
					end_time: "2022-10-14T15:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T15:18:39.865038+07:00",
					end_time: "2022-10-14T16:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T16:18:39.865038+07:00",
					end_time: "2022-10-14T17:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T17:18:39.865038+07:00",
					end_time: "2022-10-14T18:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T18:18:39.865038+07:00",
					end_time: "2022-10-14T19:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T19:18:39.865038+07:00",
					end_time: "2022-10-14T20:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T20:18:39.865038+07:00",
					end_time: "2022-10-14T21:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T21:18:39.865038+07:00",
					end_time: "2022-10-14T22:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T22:18:39.865038+07:00",
					end_time: "2022-10-14T23:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-14T23:18:39.865038+07:00",
					end_time: "2022-10-15T00:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T00:18:39.865038+07:00",
					end_time: "2022-10-15T01:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T01:18:39.865038+07:00",
					end_time: "2022-10-15T02:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T02:18:39.865038+07:00",
					end_time: "2022-10-15T03:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T03:18:39.865038+07:00",
					end_time: "2022-10-15T04:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T04:18:39.865038+07:00",
					end_time: "2022-10-15T05:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T05:18:39.865038+07:00",
					end_time: "2022-10-15T06:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T06:18:39.865038+07:00",
					end_time: "2022-10-15T07:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T07:18:39.865038+07:00",
					end_time: "2022-10-15T08:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T08:18:39.865038+07:00",
					end_time: "2022-10-15T09:18:39.865038+07:00",
					success: 0,
					failed: 0
				},
				{
					start_time: "2022-10-15T09:18:39.865038+07:00",
					end_time: "2022-10-15T10:18:39.865038+07:00",
					success: 0,
					failed: 0
				}
			],
			response_time: [
				{
					start_time: "2022-10-14T10:18:39.865038+07:00",
					end_time: "2022-10-14T11:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T11:18:39.865038+07:00",
					end_time: "2022-10-14T12:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T12:18:39.865038+07:00",
					end_time: "2022-10-14T13:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T13:18:39.865038+07:00",
					end_time: "2022-10-14T14:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T14:18:39.865038+07:00",
					end_time: "2022-10-14T15:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T15:18:39.865038+07:00",
					end_time: "2022-10-14T16:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T16:18:39.865038+07:00",
					end_time: "2022-10-14T17:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T17:18:39.865038+07:00",
					end_time: "2022-10-14T18:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T18:18:39.865038+07:00",
					end_time: "2022-10-14T19:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T19:18:39.865038+07:00",
					end_time: "2022-10-14T20:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T20:18:39.865038+07:00",
					end_time: "2022-10-14T21:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T21:18:39.865038+07:00",
					end_time: "2022-10-14T22:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T22:18:39.865038+07:00",
					end_time: "2022-10-14T23:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-14T23:18:39.865038+07:00",
					end_time: "2022-10-15T00:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T00:18:39.865038+07:00",
					end_time: "2022-10-15T01:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T01:18:39.865038+07:00",
					end_time: "2022-10-15T02:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T02:18:39.865038+07:00",
					end_time: "2022-10-15T03:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T03:18:39.865038+07:00",
					end_time: "2022-10-15T04:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T04:18:39.865038+07:00",
					end_time: "2022-10-15T05:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T05:18:39.865038+07:00",
					end_time: "2022-10-15T06:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T06:18:39.865038+07:00",
					end_time: "2022-10-15T07:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T07:18:39.865038+07:00",
					end_time: "2022-10-15T08:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T08:18:39.865038+07:00",
					end_time: "2022-10-15T09:18:39.865038+07:00",
					avg: 0
				},
				{
					start_time: "2022-10-15T09:18:39.865038+07:00",
					end_time: "2022-10-15T10:18:39.865038+07:00",
					avg: 0
				}
			]
		}

        axios.get.mockImplementation((url) => {
            switch(url){
                case `${BASE_URL}/monitor/stats/`:
                    return Promise.resolve({data: response_stats})
                case `${BASE_URL}/monitor/2`:
                    return Promise.resolve({data: get_detail})
                case `${BASE_URL}/monitor/`:
                    return Promise.resolve({data: get_list})
				case `${BASE_URL}/status-page/category/`:
					return Promise.resolve({data: {
						"id": 2,
						"team": 14,
						"name": "abc"
					}, status: 201})
					
            }
        })

        setUserToken("User Token");
        const mockFn = jest.fn();

        axios.put.mockImplementation(() => {
             mockFn();
             return Promise.reject({status: 400,
                          response: {
                               data: {
                                   error : 'Error Test Case'
                               }
                          }
                    })
        })


        render(<EditAPIMonitor id = {2} />);
        await waitFor(async () => {
            expect(screen.getByText('Edit Your API Monitor')).toBeDefined();
        })
        userEvent.click(screen.getByText('Save Edit'));

        await waitFor(async () => {
            expect(mockFn).toBeCalledTimes(1);
            expect(screen.queryAllByText('Error Test Case')).toHaveLength(1);
        }, 5000)

    })

})
